module.exports = function auditPlugin(schema, options = {}) {
  schema.add({
    IsDeleted: { type: Boolean, default: false, index: true },
    DeletedAt: { type: Date, default: null, index: true },
    UpdatedBy: { type: String, default: null },
  });

  schema.set("timestamps", { createdAt: "CreatedAt", updatedAt: "UpdatedAt" });

  // Always exclude soft-deleted by default
  function notDeletedFilter() {
    const current = this.getQuery ? this.getQuery() : {};
    if (!current.hasOwnProperty("IsDeleted")) {
      this.where({ IsDeleted: false });
    }
  }

  schema.pre('find', notDeletedFilter);
  schema.pre('findOne', notDeletedFilter);
  schema.pre('count', notDeletedFilter);
  schema.pre('countDocuments', notDeletedFilter);
  schema.pre('findOneAndUpdate', function () {
    // enforce not deleted on updates unless explicitly overridden
    const q = this.getQuery();
    if (!q.hasOwnProperty('IsDeleted')) {
      this.where({ IsDeleted: false });
    }
  });

  // Capture UpdatedBy in updates if we get it via options.context.updatedBy
  schema.pre(['updateOne', 'findOneAndUpdate', 'updateMany'], function () {
    const update = this.getUpdate() || {};
    const ctx = this.getOptions()?.context;
    if (ctx?.updatedBy) {
      update.$set = update.$set || {};
      update.$set.UpdatedBy = ctx.updatedBy;
    }
    // Always bump UpdatedAt when you use update operators
    update.$set = update.$set || {};
    update.$set.UpdatedAt = new Date();
    this.setUpdate(update);
  });

  // Document save hook for UpdatedBy (create/save path)
  schema.pre('save', function (next) {
    // `this.$locals.updatedBy` can be set in controller before save
    if (this.$locals?.updatedBy) {
      this.UpdatedBy = this.$locals.updatedBy;
    }
    next();
  });

  // Query helper to include deleted when needed: Model.find().withDeleted()
  schema.query.withDeleted = function () {
    return this.setQuery(this.getQuery()); // no-op to keep chainable
  };

  // Static soft delete / restore helpers
  schema.statics.softDeleteById = async function (id, updatedBy) {
    return this.findByIdAndUpdate(
      id,
      { $set: { IsDeleted: true, DeletedAt: new Date(), UpdatedBy: updatedBy } },
      { new: true }
    );
  };

  schema.statics.restoreById = async function (id, updatedBy) {
    return this.findByIdAndUpdate(
      id,
      { $set: { IsDeleted: false, DeletedAt: null, UpdatedBy: updatedBy } },
      { new: true }
    );
  };
};


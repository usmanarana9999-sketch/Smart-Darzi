const buildQuery = (req) => {
  const query = {shop: req.userId};

  if (req.query.status) {
    query.status = req.query.status;
  }

  if (req.query.category) {
    query.category = req.query.category;
  }

  if (req.query.customerId) {
    query.customer = req.query.customerId;
  }

  if (req.query.search) {
    query.$text = {$search: req.query.search};
  }

  return query;
};

const createCrudController = (Model, resourceName, options = {}) => {
  const listKey = options.listKey || `${resourceName}s`;
  const itemKey = options.itemKey || resourceName;
  const populate = options.populate || [];

  const applyPopulate = (query) => {
    populate.forEach((field) => query.populate(field));
    return query;
  };

  return {
    create: async (req, res, next) => {
      try {
        const item = await Model.create({...req.body, shop: req.userId});
        res.status(201).json({[itemKey]: item});
      } catch (err) {
        next(err);
      }
    },

    list: async (req, res, next) => {
      try {
        const page = Math.max(parseInt(req.query.page || '1', 10), 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit || '20', 10), 1), 100);
        const skip = (page - 1) * limit;
        const query = buildQuery(req);

        const [items, total] = await Promise.all([
          applyPopulate(Model.find(query)).sort({createdAt: -1}).skip(skip).limit(limit),
          Model.countDocuments(query),
        ]);

        res.json({[listKey]: items, pagination: {page, limit, total}});
      } catch (err) {
        next(err);
      }
    },

    get: async (req, res, next) => {
      try {
        const item = await applyPopulate(Model.findOne({_id: req.params.id, shop: req.userId}));
        if (!item) {
          return res.status(404).json({message: `${resourceName} not found`});
        }
        res.json({[itemKey]: item});
      } catch (err) {
        next(err);
      }
    },

    update: async (req, res, next) => {
      try {
        const item = await Model.findOneAndUpdate(
          {_id: req.params.id, shop: req.userId},
          req.body,
          {new: true, runValidators: true}
        );

        if (!item) {
          return res.status(404).json({message: `${resourceName} not found`});
        }

        res.json({[itemKey]: item});
      } catch (err) {
        next(err);
      }
    },

    remove: async (req, res, next) => {
      try {
        const item = await Model.findOneAndDelete({_id: req.params.id, shop: req.userId});
        if (!item) {
          return res.status(404).json({message: `${resourceName} not found`});
        }
        res.json({message: `${resourceName} deleted`});
      } catch (err) {
        next(err);
      }
    },
  };
};

module.exports = createCrudController;

const validateQuery = (req, res, next) => {
  const { sorts, filters } = req.body;
  
  const emptyObj = (obj = {}) => Object.keys(obj).length === 0;

  const sortBySet = new Set([
    'brand_id',
    'name',
    'description',
    'created_at',
    'updated_at'
  ])
  
  const sortOrderSet = new Set([
    'asc',
    'desc'
  ])
  
  const filtersKeySet = new Set([
    'property',
    'equals',
    'does_not_equal'
  ])

  if(emptyObj(req.body)) {
    req.body = {
      sorts: {
        by: 'brand_id',
        order: 'asc'
      }
    }
    next();
  }
  
  if(emptyObj(req.body.sorts)) {
    next({
      status: 400,
      message: `sorts cannot be an empty object - value: ${JSON.stringify(sorts)}`
    });
  }
  
  if(emptyObj(req.body.filters)) {
    next({
      status: 400,
      message: `filters cannot be an empty object - value: ${JSON.stringify(filters)}`
    });
  }
  
  if(!sortBySet.has(sorts.by)){
    next({
      status: 400,
      message: `sorts.by must equal ${JSON.stringify(Array.from(sortBySet))} - value: ${sorts.by}`
    });
  }
  
  if(!sortOrderSet.has(sorts.order)){
    next({
      status: 400,
      message: `sorts.order must equal ${JSON.stringify(Array.from(sortOrderSet))} - value: ${sorts.order}`
    });
  }

  if(!emptyObj(filters)){
    const filtersKeys = Object.keys(filters);

    if(filtersKeys.length !== 2){
      next({
        status: 400,
        message: `filters is not formatted properly - value: ${JSON.stringify(filters)}`
      });
    }

    filtersKeys.forEach(key => {
      if(!filtersKeySet.has(key)){
        next({
          status: 400,
          message: `filters has invalid key, it must be one of the following ${JSON.stringify(Array.from(filtersKeySet))} - value: ${key}`
        });
      }

      if(key === 'property'){
        if(!sortBySet.has(filters[key])){
          next({
            status: 400,
            message: `filters.property has invalid key, it must be one of the following ${JSON.stringify(Array.from(sortBySet))} - value: ${filters[key]}`
          });
        }
      }
    })

  }
  
  next();
}

module.exports = {
  validateQuery
}
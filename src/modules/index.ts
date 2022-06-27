async function getAllModules() {
  try {
    const queries = (await import('./products/queries'))?.default;
    const mutations = (await import('./products/mutations'))?.default;
    const schema = (await import('./products/schema'))?.default;
    return [
      {
        typeDefs: schema,
        resolvers: {
          ...queries,
          ...mutations
        },
      }
    ]
  } catch(err) {
    console.log(err);
  }
}

export default getAllModules;

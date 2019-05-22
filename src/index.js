const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args, context) => links.find(link => link.id === args.id)
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link)
      return link
    },

    updateLink: (parent, args) => {
      let index = links.findIndex(link => link.id === args.id)
      links[index].description = args.description
      links[index].url = args.url
      return links[index]
    },

    deleteLink: (parent, args) => {
      let index = links.findIndex(link => link.id === args.id)
      const deletedLink = links[index]
      links = links.filter(link => link.id !== args.id)
      return deletedLink
    }
  }
}

const server = new GraphQLServer({typeDefs: "./src/schema.graphql", resolvers})
server.start(() => console.log(`Server is running on http://localhost:4000`))
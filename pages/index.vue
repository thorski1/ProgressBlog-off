<template>
  <section id="posts">
    <PostPreview
      v-for="post in posts"
      :key="post.id" 
      :title="post.title"
      :excerpt="post.previewText"
      :thumbnailImage="post.thumbnailUrl"
      :id="post.id" />
  </section>
</template>

<script>
import PostPreview from "@/components/Blog/PostPreview";

export default {
  components: {
    PostPreview
  },
  asyncData(context) {
    return context.app.$storyapi
    .get('cdn/stories', {
      version: context.isDev ? 'draft' : 'published',
      starts_with: 'blog/'
    })
    .then(res => {
      return {
      posts: res.data.stories.map(bp => {
        return {
        id: bp.slug,
        title: bp.content.title,
        previewText: bp.content.summary,
        thumbnailUrl: bp.content.thumbnail
        };
      })
      };  
    });
  }
  
  // data() {
  //   return {
  //     posts: [
  //       { 
  //         title: "first blog post",
  //         previewText: "This is gonna be a good one!",
  //         thumbnailUrl: "https://images.pexels.com/photos/2221928/pexels-photo-2221928.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  //         id: "the-first-post"
  //       },
  //       { 
  //         title: "second blog post",
  //         previewText: "This is gonna be a good one!",
  //         thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
  //         id: "the-second-post"
  //       }
  //     ]
  //   }
  // }
};
</script>

<style>
  #posts {
    padding-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  @media (min-width: 35rem) {
    #posts {
    flex-direction: row;
    }
  }
</style>

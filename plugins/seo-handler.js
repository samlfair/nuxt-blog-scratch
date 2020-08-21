export default (context, inject) => {
  const seo = (postContent, path) => {
    const meta = [
      {
        property: "og:url",
        content: process.env.baseUrl + path,
        hid: "og:url"
      },
      {
        itemprop: "name",
        content: postContent.meta_title[0].text || postContent.title[0].text,
        hid: "name"
      },
      {
        name: "twitter:title",
        content: postContent.meta_title[0].text || postContent.title[0].text,
        hid: "twitter:title"
      },
      {
        property: "og:title",
        content: postContent.meta_title[0].text || postContent.title[0].text,
        hid: "og:title"
      }
    ];
    if (postContent.meta_description[0].text) {
      meta.push(
        {
          property: "description",
          content: postContent.meta_description[0].text
        },
        {
          property: "og:description",
          content: postContent.meta_description[0].text
        },
        {
          itemprop: "description",
          content: postContent.meta_description[0].text
        }
      );
    }
    if (postContent.meta_image.url) {
      meta.push(
        {
          property: "og:image",
          content: postContent.meta_image.url
        },
        {
          name: "twitter:image",
          content: postContent.meta_image.url
        },
        {
          name: "twitter:image:alt",
          content: postContent.meta_image.url
        },
        {
          property: "og:image:alt",
          content: postContent.meta_image.alt
        },
        {
          itemprop: "image",
          content: postContent.meta_image.url
        }
      );
    }
    return { meta, title: postContent.title[0].text };
  };
  inject("seo", seo);
  context.$seo = seo;
};

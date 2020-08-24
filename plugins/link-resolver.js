/**
 * To learn more about Link Resolving check out the Prismic documentation
 */

export default function(doc) {
  if (doc.link_type === "Web") {
    return doc.url;
  }
  if (doc.isBroken) {
    return "/not-found";
  }
  if (doc.type === "page" && doc.uid === "home") {
    return "/";
  }
  if (doc.type === "page") {
    return "/page/" + doc.uid;
  }
  if (doc.type === "author") {
    return "/author/" + doc.uid;
  }
  if (doc.type === "post") {
    return "/post/" + doc.uid;
  }

  return "/not-found";
}

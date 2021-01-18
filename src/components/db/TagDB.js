import { dbService } from "../../blogFirebase";

const saveDBTag = async tags => {
  await dbService.collection("statics").doc("tags").set({
    name: tags,
  });
};

const addDBTag = async (tags, inputTag) => {
  await dbService
    .collection("statics")
    .doc("tags")
    .set({
      name: [...tags, inputTag],
    });
};

const loadDBTag = async () => {
  try {
    const dbTags = await dbService.collection("statics").doc("tags").get();

    return dbTags.data().name;
  } catch (error) {
    return [];
  }
};

export { saveDBTag, addDBTag, loadDBTag };

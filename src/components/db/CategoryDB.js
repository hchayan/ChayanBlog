import React from "react";
import { dbService } from "../../blogFirebase";

const saveDBCategory = async categories => {
  await dbService.collection("statics").doc("categories").set({
    name: categories,
  });
};

const addDBCategory = async (categories, inputCategory) => {
  await dbService
    .collection("statics")
    .doc("categories")
    .set({
      name: [...categories, inputCategory],
    });
};

const loadDBCategory = async () => {
  try {
    const dbCategories = await dbService
      .collection("statics")
      .doc("categories")
      .get();

    return dbCategories.data().name;
  } catch (error) {
    return [];
  }
};

export { saveDBCategory, addDBCategory, loadDBCategory };

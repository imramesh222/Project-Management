import { Category } from "../models/categoryModel.js";

export const addCategory = async (request, response) => {
  try {
    const category_new = await Category.create({
      category_name: request.body.category_name,
    });

    if (!category_new) {
      return response.status(400).json({ error: "Something went wrong" });
    }

    response.status(201).json({
      message: "Category created successfully",
      category: category_new,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
};



// export const addCategory = (request, response) => {
//   Category.create({
//     category_name: request.body.category_name,
//   })
//     .then((category_new) => {
//       if (!category_new) {
//         return response
//           .status(400)
//           .json({ error: "Something went wrong" });
//       }
//       response.status(201).json({
//         message: "Category created successfully",
//         category: category_new,
//       });
//     })
//     .catch((error) => {
//       return response.status(500).json({ error: error.message });
//     });
// };

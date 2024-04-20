const extesionController = require("../controllers/extesionController");
const authMiddlewers = require("../middlewares/authMiddlewers");
const imgExtentionMiddlewers = require("../middlewares/imgExtentionMiddlewers");
const dynamicMiddleware = require("../middlewares/dynamicMiddleware");
const express = require("express");
const router = express.Router({ mergeParams: true });
router
  .route("/uplode")
  .post(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("user"),
    dynamicMiddleware.addVarBody("order", "orderId"),
    imgExtentionMiddlewers.uploadUserPhoto,
    dynamicMiddleware.setPathImginBody("extensions", "photo"),
    extesionController.createextesion
  );
router
  .route("/") //استعلام عن اضفات طلب محدد
  .get(
    authMiddlewers.protect,
    dynamicMiddleware.addQuery("order", "orderId"),
    extesionController.getAllextesion
  )
  .post(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("user"),
    dynamicMiddleware.addVarBody("order", "orderId"),
    extesionController.createextesion
  );
router
  .route("/:id")
  .get(authMiddlewers.protect, extesionController.getextesion)
  .patch(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("user"),
    extesionController.updateextesion
  )
  .delete(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("user"),
    extesionController.deleteextesion
  );
router
  .route("/:id/uplode")
  .patch(
    authMiddlewers.protect,
    authMiddlewers.restrictTo("user"),
    imgExtentionMiddlewers.uploadUserPhoto,
    dynamicMiddleware.filteredBody("photo"),
    dynamicMiddleware.setPathImginBody("extensions", "photo"),
    extesionController.updateextesion
  );

module.exports = router;

// src/api/v1/routes/events.routes.js
const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/event.controller");
const { authenticate } = require("../../../middlewares/auth.middleware");
const { requireRole } = require("../../../middlewares/role.middleware");

// public list and detail
router.get("/", eventsController.list);
router.get("/:id", eventsController.get);

// create (organizer or admin)
router.post(
  "/",
  authenticate,
  requireRole("organizer"),
  eventsController.create
);

// update/delete - authenticated and organizer (owner) or admin
router.put(
  "/:id",
  authenticate,
  requireRole("organizer"),
  eventsController.update
);
router.delete(
  "/:id",
  authenticate,
  requireRole("organizer"),
  eventsController.remove
);

// register for an event - any authenticated user
router.post("/:id/register", authenticate, eventsController.register);

// view participants of an event
router.get("/:id/participants", authenticate, eventsController.getParticipants);

module.exports = router;

import express from "express";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../controllers/document.controller.js";

const router = express.Router();

// Create a new document
router.post("/", createDocument);

// Get all documents
router.get("/", getDocuments);

// Get a document by ID
router.get("/:id", getDocumentById);

// Update a document
router.put("/:id", updateDocument);

// Delete a document
router.delete("/:id", deleteDocument);

export  {
    router
}

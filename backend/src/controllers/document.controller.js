import { Document } from "../models/document.model.js";

// Create a new document
export const createDocument = async (req, res) => {
  try {
    const { fileName, url, owner, library } = req.body;

    if (!fileName || !url || !owner || !library) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newDocument = new Document({
      fileName,
      url,
      owner,
      library,
    });

    await newDocument.save();
    res.status(201).json({ message: "Document created successfully.", document: newDocument });
  } catch (error) {
    res.status(500).json({ message: "Error creating document.", error: error.message });
  }
};

// Get all documents
export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find().populate("owner", "username").populate("library", "title");
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching documents.", error: error.message });
  }
};

// Get a document by ID
export const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findById(id).populate("owner", "username").populate("library", "title");

    if (!document) {
      return res.status(404).json({ message: "Document not found." });
    }

    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: "Error fetching document.", error: error.message });
  }
};

// Update a document
export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { fileName, url, owner, library } = req.body;

    const updatedDocument = await Document.findByIdAndUpdate(
      id,
      { fileName, url, owner, library },
      { new: true, runValidators: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found." });
    }

    res.status(200).json({ message: "Document updated successfully.", document: updatedDocument });
  } catch (error) {
    res.status(500).json({ message: "Error updating document.", error: error.message });
  }
};

// Delete a document
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDocument = await Document.findByIdAndDelete(id);

    if (!deletedDocument) {
      return res.status(404).json({ message: "Document not found." });
    }

    res.status(200).json({ message: "Document deleted successfully.", document: deletedDocument });
  } catch (error) {
    res.status(500).json({ message: "Error deleting document.", error: error.message });
  }
};

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApirError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Message } from "../models/message.model.js";
import { Section } from "../models/section.model.js";



export const createMessage = asyncHandler(async (req, res) => {
    const { content, chat, owner } = req.body;

    if (!content || !chat || !owner) {
        throw new ApiError(400, "Content, chat, and owner are required");
    }

    const newMessage = new Message({
        content,
        chat,
        owner
    });

    await newMessage.save();

    res.status(201).json(new ApiResponse(201, newMessage, "Message created successfully"));
});


export const getMessagesByChat = asyncHandler(async (req, res) => {
    const { chatId, page = 1, limit = 10 } = req.query;

    if (!chatId) {
        throw new ApiError(400, "Chat ID is required");
    }

    const aggregationQuery = [
        { 
            $match: { 
            chat: mongoose.Types.ObjectId(chatId)
         } 
        }, 
        { 
            $sort: { createdAt: -1 }
         }
    ];

    const messages = await Message.aggregatePaginate(Message.aggregate(aggregationQuery), { page, limit });

    res.status(200).json(new ApiResponse(200, messages, "Messages fetched successfully"));
});


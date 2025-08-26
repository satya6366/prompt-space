import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET a single prompt
export const GET = async (request, { params }) => {
  try {
    const awaitedParams = await params;
    await connectToDB();

    const prompt = await Prompt.findById(awaitedParams.id).populate("creator");
    if (!prompt) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.error("GET /api/prompt/[id] error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

// PATCH (update) a prompt
export const PATCH = async (request, { params }) => {
  try {
    const awaitedParams = await params;
    const { prompt, tag } = await request.json();

    await connectToDB();

    const existingPrompt = await Prompt.findById(awaitedParams.id);
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response("Successfully updated the prompt", { status: 200 });
  } catch (error) {
    console.error("PATCH /api/prompt/[id] error:", error);
    return new Response("Error Updating Prompt", { status: 500 });
  }
};

// DELETE a prompt
export const DELETE = async (request, { params }) => {
  try {
    const awaitedParams = await params;
    await connectToDB();

    await Prompt.findByIdAndDelete(awaitedParams.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.error("DELETE /api/prompt/[id] error:", error);
    return new Response("Error deleting prompt", { status: 500 });
  }
};

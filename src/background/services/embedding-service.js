import { pipeline, env } from '@xenova/transformers';

// Ensure we use the remote -> cache flow
env.allowLocalModels = false;

/**
 * Singleton class to manage the AI pipeline.
 * Ensures the model is loaded only once, and lazily.
 */
export class EmbeddingPipelineSingleton {
    static task = 'feature-extraction';
    static model = 'Xenova/all-MiniLM-L6-v2';

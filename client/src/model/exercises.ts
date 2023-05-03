import { api } from "./fetcher";
import type { DataListEnvelope, DataEnvelope } from "./fetcher";

export interface Exercise {
    _id: string | string[],
    timestamp: string | string[],
    name: string | undefined,
    duration: string,
    workout: string,
    description: string
}

export function addExercise(exercise: Exercise): Promise<DataEnvelope<Exercise>> {
    return api("exercises", "POST", exercise); 
}

export function updateExercise(id: string | string[], exercise: Exercise): Promise<DataEnvelope<Exercise>> {
    return api(`exercises/${id}`, "PATCH", exercise);
}

export function deleteExercise(id: string | string[]): Promise<DataEnvelope<Exercise>> {
    return api(`exercises/${id}`, "DELETE")
}

export function getExercises(): Promise<DataListEnvelope<Exercise>> { 
    return api('exercises', "GET"); 
}

export function getExercise(id: string | string[]): Promise<DataEnvelope<Exercise>>{
    return api(`exercises/${id}`, "GET");
}
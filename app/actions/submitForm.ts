"use server";

import { formSchema } from "../schema/formSchema";

export async function submitForm(data:any){

const validated = formSchema.parse(data);

console.log("Form Submitted:", validated);

return {success:true};

}
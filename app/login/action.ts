'use server';
import { SignupFormSchema, FormState } from '@/lib/definitions';

export async function signin(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    console.log('allow');
    const { email, password } = validatedFields.data;
    // Call the provider or db to create a user...
    const rs = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
    const result = await rs.json();
    return result;
}

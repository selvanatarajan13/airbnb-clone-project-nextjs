import { z } from "zod";

const educationalSchema = z.discriminatedUnion("educationalLevel", [
    z.object({
        educationalLevel: z.literal("noFormalEducation")
    }),

    z.object({
        educationalLevel: z.literal("highSchoolDiploma"),
        schoolName: z.string().min(3),
    }),

    z.object({
        educationalLevel: z.literal("bachelorDegree"),
        universityName: z.string().min(3),
    })
])

const languageKnowledgeSchema = z.discriminatedUnion("hasKnownOtherLanguages", [
    z.object({
        hasKnownOtherLanguages: z.literal(true),
        languages: z.array(
            z.object({
                name: z.string().min(3),
            })
        )
    }),

    z.object({
        hasKnownOtherLanguages: z.literal(false),
    })
])

const workExperienceSchema = z.discriminatedUnion("hasWorkExperience",[
    z.object({
        hasWorkExperience: z.literal(true),
        companyName: z.string().min(3)
    }),

    z.object({
        hasWorkExperience: z.literal(false)
    })
])

const formSchema = z.object({
    fullName: z.string().min(3, "Name must be above 3 character"),
}).and(workExperienceSchema).and(languageKnowledgeSchema).and(educationalSchema);

const EmployeeResponseSchema = z.object({
    status: z.literal("success"),
    message: z.string()
});

type FormSchema = z.infer<typeof formSchema>;
export type EmployeeResponse = z.infer<typeof EmployeeResponseSchema>;

const formDefaultValues: FormSchema = {
    fullName: "",
    hasWorkExperience: false,
    hasKnownOtherLanguages: false,
    educationalLevel: "noFormalEducation",
}

export {
    formDefaultValues, formSchema, type FormSchema, EmployeeResponseSchema
}
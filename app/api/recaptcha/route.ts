import { NextRequest, NextResponse } from "next/server";
import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const code = searchParams.get("code");

    const gcpcre = JSON.parse(process.env.GCP_JSON!);

    const client = new RecaptchaEnterpriseServiceClient({credentials:JSON.parse(process.env.RCSA_JSON!)});
    const projectPath = client.projectPath(gcpcre.project_id);
    console.log("-=--code-=-=",code);
    console.log("--=proj-=-=", projectPath);
    const requestrc = ({
        assessment: {
            event: {
                token: code,
                siteKey: "6Ldhw1knAAAAALTeoCS6KE3uiamWFWoJLwJajscG",
            },
        },
        parent: projectPath,
    });
    try {

        const [ response ] = await client.createAssessment(requestrc);

        if (!response?.tokenProperties?.valid) {
            console.log("The CreateAssessment call failed because the token was: ", response.tokenProperties?.invalidReason);

            return NextResponse.json({data: response.tokenProperties?.invalidReason}, {status: 200});
        }

        if (response.tokenProperties.action === "supportagent") {

            // Get the risk score and the reason(s).
            // For more information on interpreting the assessment,
            // see: https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
            console.log("The reCAPTCHA score is: ",response.riskAnalysis?.score);

            response.riskAnalysis?.reasons?.forEach((reason) => {
                console.log(reason);
            });
            return NextResponse.json({data: response}, {status: 200});
        } else {
            console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
            return NextResponse.json({data: null}, {status: 200});
        }
    } catch(e) {
        client.close();
        console.log(e);
    }
    return NextResponse.json({data: null}, {status: 200});
}
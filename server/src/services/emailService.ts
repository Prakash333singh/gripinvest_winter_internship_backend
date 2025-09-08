export async function sendEmail(Email:string,Subject:string,Text:string){
    console.log(`Email sent to ${Email} with subject "${Subject}" and text "${Text}"`);
    return true;
    
}
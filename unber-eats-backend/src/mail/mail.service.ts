import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interfaces';
import got from "got"
import * as FormData from "form-data"
import { from } from 'form-data';

@Injectable()
export class MailService {
    constructor(@Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions)
    {
        // this.sendEmail("testing","test")
    }

    private async sendEmail(subject:string,to:string, template:string, emailVars:EmailVar[]){
        const form = new FormData();
        form.append("from",`Paul from uber Eats Clone <mailgun@${this.options.domain}>`)
        form.append("to",to)
        form.append("subject",subject)
        form.append("template",template)
        emailVars.forEach(eVar => form.append(`v:${eVar.key}`, eVar.value))
        
        try{
            const response = got(`https://api.mailgun.net/v3/${this.options.domain}/messages`,{
                method:'POST',    
                headers: {
                    "Authorization": `Basic ${Buffer.from(
                        `api:${this.options.apikey}`,
                        ).toString('base64')}`,
                },
                body:form,
            })
        }catch(e){
            console.log(e)
        }
    }
    

    sendVerificatioNEmail(email:string,  code:string) {
        this.sendEmail("Verify Your Email",email ,"account",[
            {"key":"code","value":code},
            {"key":"username","value":email}
        ])
    }

}

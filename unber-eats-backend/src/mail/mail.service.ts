import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions } from './mail.interfaces';
import got from "got"
import * as FormData from "form-data"
import { from } from 'form-data';

@Injectable()
export class MailService {
    constructor(@Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions)
    {
        // this.sendEmail("testing","test")
    }

    private async sendEmail(subject:string, template:string){
        const form = new FormData();
        form.append("from",`Excited User<mailgun@${this.options.domain}>`)
        form.append("to",`paul_lee@kakao.com`)
        form.append("subject",subject)
        form.append("template",template)
        form.append("v:code","hello~")
        form.append("v:username","paul")
        
        const response = got(`https://api.mailgun.net/v3/${this.options.domain}/messages`,{
            method:'POST',    
            headers: {
                "Authorization": `Basic ${Buffer.from(
                    `api:${this.options.apikey}`,
                    ).toString('base64')}`,
            },
            body:form,
        })

        console.log((await response).body)
    }
    
}

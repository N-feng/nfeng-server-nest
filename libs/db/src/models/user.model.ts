import { ApiProperty } from '@nestjs/swagger'
import { DocumentType, modelOptions, prop } from '@typegoose/typegoose'
import { hashSync } from 'bcryptjs'

export type UserDocument = DocumentType<User>;

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class User {
    @ApiProperty({ description: '用户名', example: 'user1' })
    @prop()
    username: string

    @ApiProperty({ description: '密码', example: 'pass1' })
    @prop({
        select: false,
        get(val) {
            return val
        },
        set(val) {
            return val ? hashSync(val) : val
        }
    })
    password: string
}
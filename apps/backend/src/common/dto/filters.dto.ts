import { IsOptional, IsString } from 'class-validator'


export class FiltersDto {
@IsOptional() @IsString() department_id?: string
@IsOptional() @IsString() year?: string
@IsOptional() @IsString() week?: string
@IsOptional() @IsString() task_id?: string
@IsOptional() @IsString() employee_type_id?: string
@IsOptional() @IsString() project_id?: string
@IsOptional() @IsString() employee_id?: string
}
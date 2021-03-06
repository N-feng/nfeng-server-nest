/*
 * @Date: 2021-01-25 10:05:27
 * @LastEditors: N-feng
 * @LastEditTime: 2021-01-27 14:49:29
 * @FilePath: /nfeng-server-nest/apps/server/src/admin/role/role.controller.ts
 */
import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/role.dto';
import { Config } from '../../config/config';

@Controller(`${Config.adminPath}/role`)
@ApiTags('角色')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post('findAll')
  @ApiOperation({ summary: '角色列表' })
  async findAll(@Body() body) {
    // 搜索
    const query = {
      title: { $regex: new RegExp(body.title) },
      description: { $regex: new RegExp(body.description) }
    }
    // 分页
    const page = body.page || 1;
    const pageSize = 3;
    const skip = (page - 1) * pageSize;
    const list = await this.roleService.find(query, skip, pageSize)
    const count = await this.roleService.count(query)
    const total = Math.ceil(count / pageSize);
    return { code: 200, data: { list, total } }
  }

  @Post('findOne')
  @ApiOperation({ summary: '查询角色' })
  async findOne(@Body('id') id: string) {
    const role = await this.roleService.findOne(id)
    return {code: 200, data: role}
  }

  @Post('create')
  @ApiOperation({ summary: '创建角色' })
  async create(@Body() body: CreateRoleDto) {
    await this.roleService.create(body)
    return {code: 200, data: {}}
  }

  @Post('update')
  @ApiOperation({ summary: '更新角色' })
  async update(@Body() body: CreateRoleDto) {
    await this.roleService.update(body)
    return {code: 200, data: {}}
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除角色' })
  async remove(@Param('id') id: string) {
    await this.roleService.delete(id)
    return {code: 200, data: {}}
  }
}

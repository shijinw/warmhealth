<template>
  <div>
    <Card style="min-height: 80vh;">
      <p slot="title">小程序配置</p>
      <Table border :columns="columns" :data="tableData" style="margin-top: 16px">
        <template slot-scope="{ row }" slot="id">
          <strong>{{ row.id }}</strong>
        </template>
        <template slot-scope="{ row }" slot="content">
          <span>{{ row.content }}</span>
        </template>
        <template slot-scope="{ row }" slot="desc">
          <span>{{ row.desc }}</span>
        </template>

      </Table>
      <!-- <div style="text-align: right; margin-top: 16px;">
        <Page
          :total="total"
          show-sizer
          show-elevator
          show-total
          :page-size-opts="pageSizeOpts"
          :page-size="form.limit"
          :current="form.page"
          @on-change="pageOnChange"
          @on-page-size-change="pageSizeOnChange" />
      </div> -->
    </Card>
  </div>
</template>

<script>
import { configList,putSystem  } from '@/api/log'
export default {
  name: 'log_page',
  data () {
    return {
      pageSizeOpts: [10, 30, 50, 100],
      total: 0,
      form: {
        start_time: '',
        end_time: '',
        limit: 10,
        page: 1
      },
      columns: [
        {
          title: 'ID',
          slot: 'id',
          tooltip: true,
          align: 'center',
          minWidth: 150
        },
        {
          title: '内容',
          slot: 'content',
          tooltip: true,
          align: 'center',
          minWidth: 150
        },

        {
          title: '备注',
          slot: 'desc',
          tooltip: true,
          align: 'center',
          minWidth: 150
        },
         {
          title: '操作',
          slot: 'action',
          minWidth:140,
          align: 'center',
          render: (h, params) => {
            return h('div', [

              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'

                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.handleRender(params.row)
                  }
                }
              }, '修改配置'),

            ])
          }
           }
      ],
      tableData: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    handleChange (date) {
      this.form.start_time = date;
    },
    handleChange1 (date) {
      this.form.end_time = date;
    },
 handleRender (row) {
   this.value=row.content
   let that=this
                this.$Modal.confirm({
                  title:"修改内容",
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.value,
                                autofocus: true,
                                placeholder: '请输入要修改的内容'
                            },
                            on: {
                                input: (val) => {
                                    this.value = val;
                                }
                            }
                        })
                    },
                      onOk: () => {
                           putSystem({id:row.id,content:this.value}).then(res=>{
                                           if (res.data.code === 200) {
                                    this.$Message.success("修改成功，请核对信息");

                                  that.getList()
            }
                                    })
                    },
                })
                console.log(this.value);
            },

    // 查询
    onSeach () {
      this.getList()
    },
    // 获取列表
    async getList () {
      let { data } = await configList()
      if (data.code == '200') {
        this.tableData = data.data
      }
    },
    // 切换分页
    pageOnChange (val) {
      this.form.pageNo = val
      this.getList()
    },
    // 切换条数
    pageSizeOnChange (val) {
      this.form.pageSize = val
      this.getList()
    }
  }
}
</script>

<style lang="less">

</style>

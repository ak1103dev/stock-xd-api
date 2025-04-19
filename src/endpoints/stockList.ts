import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import axios from 'axios'
import { Task } from "../types";

export class StockList extends OpenAPIRoute {
	schema = {
		tags: ["Stocks"],
		summary: "List Stocks",
		request: {
      params: z.object({
        month: Num({

        }),
        year: Num({

        })
      }),
			// query: z.object({
			// 	page: Num({
			// 		description: "Page number",
			// 		default: 0,
			// 	}),
			// 	isCompleted: Bool({
			// 		description: "Filter by completed flag",
			// 		required: false,
			// 	}),
			// }),
		},
		responses: {
			"200": {
				description: "Returns a list of stocks",
				content: {
					"application/json": {
						schema: z.object({
							series: z.object({
								success: Bool(),
								result: z.object({
									stocks: Task.array(),
								}),
							}),
						}),
					},
				},
			},
		},
	};

	async handle(c) {
		const data = await this.getValidatedData<typeof this.schema>();

		const { year, month } = data.params;
    console.log(year, month)

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      // url: `https://www.set.or.th/api/set/stock-calendar/2025/4/x-calendar?symbols=&caTypes=XD&lang=en`,
      url: `https://www.set.or.th/api/set/stock-calendar/${year}/${month}/x-calendar`,
      params: {
        symbols: undefined,
        caTypes: 'XD',
        lang: 'en',
      },
      headers: {
        'Cookie': 'visid_incap_2046605=devPHNU3TYO/8WEzlk1ZQJmWg2YAAAAAQUIPAAAAAAAPN7MT6veIeZ86DiZDL6gm; visid_incap_2771851=1mmaPFD5S+eNDYpqnUeBk5mWg2YAAAAAQUIPAAAAAAA+IYJmDmFLez8Sxj9sIGW6; __lt__cid=e4015b9f-b0fc-48db-ab2b-9d36f96741d6; _fbp=fb.2.1719899802717.143265745109201059; _tt_enable_cookie=1; _hjSessionUser_3931504=eyJpZCI6ImMyZGM5MjZhLTc0NDEtNThjZi1iODFjLWQ1ZTc5MWEzNTkyMSIsImNyZWF0ZWQiOjE3MTk4OTk4MDI4MTAsImV4aXN0aW5nIjp0cnVlfQ==; exp_history={"go_expid":"5AD93i4KR9-ZVNOhL9Vr2w-V2","msgt":"popup","count":1}|{"go_expid":"GusVq2U2QG2l2p9tGb5KTQ","msgt":"lightbox_exit_banner","count":1}|{"go_expid":"vZj2v2cjSuCT8gIzugw5hw","msgt":"new_highlight","count":1}; visid_incap_2685219=xFrIySQSQC+jUFfNOhqWMcPq4mYAAAAAQUIPAAAAAABjHbjFYBx1xubb6Hcys6Qv; _ttp=EBxWNjLY6m2vvxQULNYIF1SgpAG.tt.2; _ga=GA1.1.1019621994.1719899804; _gcl_au=1.1.1229771759.1737870874; SET_COOKIE_POLICY=20231111093657; my-quote=%5B%22BDMS%22%2C%22DMT%22%2C%22DIF%22%2C%22TISCO%22%2C%22MSFT80X%22%2C%223BBIF%22%2C%22LH%22%2C%22AOT%22%5D; recent-search=%5B%22bdms%22%2C%22dmt%22%2C%22dif%22%2C%22TISCO%22%2C%22MSFT80X%22%2C%223BBIF%22%2C%22drx%22%2C%22LH%22%2C%22FUEVFVND01%22%5D; charlot=3aaf4ed4-6fc3-4ff1-be75-623184529ffc; nlbi_2046605=u0wVIfNNlxAFjHYoydyeTAAAAABWIC6kM6h+RAK4yAts2svW; incap_ses_357_2046605=81LGC03Fd34ypKim6FH0BLDmAWgAAAAAfyEsJz3t4RbFkfcvOAt2lw==; landing_url=https://www.set.or.th/th/market/stock-calendar/x-calendar; _cbclose=1; _cbclose23453=1; _uid23453=1C65FDD1.31; _ctout23453=1; __lt__sid=9c19d2f8-edf4019d; incap_ses_357_2771851=y6IWXNN6rmWFqaim6FH0BLHmAWgAAAAA8f+Jr9ePyjQb5BneuMuj2g==; _hjSession_3931504=eyJpZCI6IjAyNGQ5NDcwLWRhYTAtNDUxYi1hNTY3LTRjMjEyMWQwYWRiYyIsImMiOjE3NDQ5NTUwNTg2MDMsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MX0=; api_call_counter=2; _ga_ET2H60H2CB=GS1.1.1744955059.37.1.1744955498.60.0.0; _ga_6WS2P0P25V=GS1.1.1744955059.39.1.1744955498.60.0.0; ttcsid=1744955059962.1.1744955499192; ttcsid_CPA37DRC77UCO7RT88K0=1744955059962.1.1744955549011; incap_ses_357_2046605=/toyeRiv02+OQK+m6FH0BN7oAWgAAAAAh+6bOrJuxBGkel6jBSW8Cw==; visid_incap_2046605=ljT6SEa7RiiEFGYuIik8it7oAWgAAAAAQUIPAAAAAABHU/nj6EcryJZmXuz5Y8TL',
        'Referer': 'https://www.set.or.th/en/market/stock-calendar/x-calendar'
      }
    };

    return axios.request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        return response.data
      })
      .catch((error) => {
        console.log(error);
        throw error
      });
	}
}

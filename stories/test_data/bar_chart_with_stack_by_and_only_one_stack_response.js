// (C) 2020 GoodData Corporation
module.exports = projectId => {
    return {
        executionResponse: {
            dimensions: [
                {
                    headers: [
                        {
                            attributeHeader: {
                                name: "Region",
                                localIdentifier: "regionAttribute",
                                uri: "/gdc/md/" + projectId + "/obj/1024",
                                identifier: "label.owner.region",
                                formOf: {
                                    uri: "/gdc/md/" + projectId + "/obj/1023",
                                    identifier: "region",
                                    name: "Region",
                                },
                            },
                        },
                    ],
                },
                {
                    headers: [
                        {
                            attributeHeader: {
                                name: "Department",
                                localIdentifier: "departmentAttribute",
                                uri: "/gdc/md/" + projectId + "/obj/1027",
                                identifier: "label.owner.department",
                                formOf: {
                                    uri: "/gdc/md/" + projectId + "/obj/1026",
                                    identifier: "department",
                                    name: "Department",
                                },
                            },
                        },
                        {
                            measureGroupHeader: {
                                items: [
                                    {
                                        measureHeaderItem: {
                                            name: "Amount",
                                            format: "#,##0.00",
                                            localIdentifier: "amountMetric",
                                            uri: "/gdc/md/" + projectId + "/obj/1279",
                                            identifier: "ah1EuQxwaCqs",
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
            links: {
                executionResult:
                    "/gdc/app/projects/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/executionResults/8172216401370283008?q=eAGt0k9rwjAUAPCvUuK12FidssIYwv7gZQeZ7CA9pM1rzUiamqS4Iv3ue7Hi5sCL85aXNu%2B9%2FPL2%0AxECtjXtjCkhCVpUTTgInIcm1bFT1IbjbWJKs05AUQjowx8DonV%2FtCXPOiKxx8O5PYo4llEJXmME2%0ASjHT4hYGXNhasvZFG7XguBWVPI8Uj3hMoc3Gu8LSL7iTVBY255Wp2s125CbxNtLZZzSi8QRzZMzC%0AswQFlVstF1ckGUfQH7ePgj9gxsNtf%2Fd8us1VTY59Su2Y9DTrNO1QzaIuSfZHz3O9tENVFGH4BymN%0A%2BHG%2FYPsENTPOA2Clm%2FrObuE7veR71vf%2FjKd%2FjUOiAEcwfzW6qQmK92EveNIdhIMBHVJ65jYP0DDQ%0ARcCkDDjgu4WBgZIZLsFa%2F8E6VkKgjV%2B4xg598eOcz5VuDu%2FQ17tiYOLZPenS7htnfC4J%0A&c=890fb6fd59710a0e1eeb9fecf6a2b92e&dimension=Department&dimension=Amount",
            },
        },
    };
};

const apiT = require('../components/apiResponse');
var apiJson =" Object {\n" +
    "   \"data\": Array [\n" +
    "     Object {\n" +
    "       \"attributes\": Object {\n" +
    "         \"created-at\": \"2016-10-10T07:10:59.000Z\",\n" +
    "         \"definition-json\": Object {\n" +
    "           \"dataset_id\": null,\n" +
    "           \"dataset_name\": null,\n" +
    "           \"index\": 0,\n" +
    "           \"scenario_name\": \"Buy many books\",\n" +
    "           \"steps\": Array [\n" +
    "             Object {\n" +
    "               \"action\": \"Log with default account\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"result\": \"Check that user is logged\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"action\": \"Go to on-line library\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"action\": \"Select the book Harry Potter and the order of the phoenix\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"action\": \"Add to cart\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"action\": \"Select the book Harry Potter and the goblet of fire\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"action\": \"Add to cart\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"result\": \"Check that cart contains 2 books\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"action\": \"Pay\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"result\": \"Check cart is paid\",\n" +
    "             },\n" +
    "           ],\n" +
    "         },\n" +
    "         \"folder-snapshot-id\": 240302,\n" +
    "         \"last-author\": \"simon.rougeot@gmail.com\",\n" +
    "         \"name\": \"Buy many books\",\n" +
    "         \"status\": \"failed\",\n" +
    "         \"updated-at\": \"2018-01-23T14:31:01.129Z\",\n" +
    "       },\n" +
    "       \"id\": \"1184126\",\n" +
    "       \"links\": Object {\n" +
    "         \"self\": \"/test-snapshots/1184126\",\n" +
    "       },\n" +
    "       \"relationships\": Object {\n" +
    "         \"dataset\": Object {},\n" +
    "         \"last-result\": Object {\n" +
    "           \"links\": Object {\n" +
    "             \"related\": \"/test-snapshots/1184126/last-result\",\n" +
    "             \"self\": \"/test-snapshots/1184126/relationships/last-result\",\n" +
    "           },\n" +
    "         },\n" +
    "         \"scenario\": Object {},\n" +
    "       },\n" +
    "       \"type\": \"test-snapshots\",\n" +
    "     },\n" +
    "     Object {\n" +
    "       \"attributes\": Object {\n" +
    "         \"created-at\": \"2016-10-10T07:10:59.000Z\",\n" +
    "         \"definition-json\": Object {\n" +
    "           \"dataset_id\": null,\n" +
    "           \"dataset_name\": null,\n" +
    "           \"index\": 0,\n" +
    "           \"scenario_name\": \"A selection can be cancelled\",\n" +
    "           \"steps\": Array [\n" +
    "             Object {\n" +
    "               \"action\": \"Log with default account\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"result\": \"Check that user is logged\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"action\": \"Go to on-line library\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"action\": \"Select the book Harry Potter and the order of the phoenix\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"action\": \"Add to cart\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"result\": \"Check that cart contains 1 books\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"action\": \"Cancel cart\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"result\": \"Check that cart contains 0 books\",\n" +
    "             },\n" +
    "           ],\n" +
    "         },\n" +
    "         \"folder-snapshot-id\": 240302,\n" +
    "         \"last-author\": \"sammyloudiyi@gmail.com\",\n" +
    "         \"name\": \"A selection can be cancelled\",\n" +
    "         \"status\": \"undefined\",\n" +
    "         \"updated-at\": \"2018-01-23T13:48:47.034Z\",\n" +
    "       },\n" +
    "       \"id\": \"1184127\",\n" +
    "       \"links\": Object {\n" +
    "         \"self\": \"/test-snapshots/1184127\",\n" +
    "       },\n" +
    "       \"relationships\": Object {\n" +
    "         \"dataset\": Object {},\n" +
    "         \"last-result\": Object {\n" +
    "           \"links\": Object {\n" +
    "             \"related\": \"/test-snapshots/1184127/last-result\",\n" +
    "             \"self\": \"/test-snapshots/1184127/relationships/last-result\",\n" +
    "           },\n" +
    "         },\n" +
    "         \"scenario\": Object {},\n" +
    "       },\n" +
    "       \"type\": \"test-snapshots\",\n" +
    "     },\n" +
    "     Object {\n" +
    "       \"attributes\": Object {\n" +
    "         \"created-at\": \"2016-10-10T07:10:59.000Z\",\n" +
    "         \"definition-json\": Object {\n" +
    "           \"dataset_id\": null,\n" +
    "           \"dataset_name\": null,\n" +
    "           \"index\": 0,\n" +
    "           \"scenario_name\": \"Cart empty when logout\",\n" +
    "           \"steps\": Array [\n" +
    "             Object {\n" +
    "               \"action\": \"Log with default account\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"result\": \"Check that user is logged\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"action\": \"Go to on-line library\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"action\": \"Select the book Harry Potter and the order of the phoenix\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"action\": \"Add to cart\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"action\": \"logout\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"action\": \"Log with default account\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"result\": \"Check that user is logged\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"action\": \"Go to on-line library\",\n" +
    "             },\n" +
    "             Object {\n" +
    "               \"result\": \"Check that cart contains 0 books\",\n" +
    "             },\n" +
    "           ],\n" +
    "         },\n" +
    "         \"folder-snapshot-id\": 240302,\n" +
    "         \"last-author\": \"simon.rougeot@gmail.com\",\n" +
    "         \"name\": \"Cart empty when logout\",\n" +
    "         \"status\": \"undefined\",\n" +
    "         \"updated-at\": \"2018-01-23T13:48:47.060Z\",\n" +
    "       },\n" +
    "       \"id\": \"1184128\",\n" +
    "       \"links\": Object {\n" +
    "         \"self\": \"/test-snapshots/1184128\",\n" +
    "       },\n" +
    "       \"relationships\": Object {\n" +
    "         \"dataset\": Object {},\n" +
    "         \"last-result\": Object {\n" +
    "           \"links\": Object {\n" +
    "             \"related\": \"/test-snapshots/1184128/last-result\",\n" +
    "             \"self\": \"/test-snapshots/1184128/relationships/last-result\",\n" +
    "           },\n" +
    "         },\n" +
    "         \"scenario\": Object {},\n" +
    "       },\n" +
    "       \"type\": \"test-snapshots\",\n" +
    "     },\n" +
    "   ],\n" +
    " }\n"

describe('getTestSnapshot', function() {
    it('Should load the api', function(){
        return apiT.getTestSnapshot()
            .then(data => {
                expect(data).toBeDefined()
                expect(data).toEqual(apiJson)
            })
    })
});

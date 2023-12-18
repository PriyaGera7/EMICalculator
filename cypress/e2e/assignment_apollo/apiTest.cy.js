describe('API Test' ,() =>{
    it('Test API and validate response',()=>{
       cy.fixture('apiTest.json').then((expectedUsers)=>{

        cy.request('GET',"https://reqres.in/api/users?page=2").then((response) =>{
                // Validate the response code
                expect(response.status).to.equal(200)

                // Validate API response with the expected data from the JSON considering order doesn't change.
                const actualUsers = response.body.data
                const expectedUsersData = expectedUsers.data;

                cy.log(actualUsers)
                cy.log(`Name": ${actualUsers[0].first_name}`);
                cy.log(expectedUsers)

                actualUsers.forEach((actualUser, index) => {
                    expect(expectedUsersData[index].id).to.equal(actualUser.id);
                    expect(expectedUsersData[index].email).to.equal(actualUser.email);
                    expect(expectedUsersData[index].first_name).to.equal(actualUser.first_name);
                    expect(expectedUsersData[index].last_name).to.equal(actualUser.last_name);
                    expect(expectedUsersData[index].avatar).to.equal(actualUser.avatar);
                });
            });
        })

       })

    })
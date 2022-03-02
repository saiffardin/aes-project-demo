## 1. Login a User
- doc name : **User Credential**
- endpoint : `/POST /users-credential`
- Valid Request Body:
    ```json
    {
        "employeeId":"012549",
        "password":"1@Aa3455"
    }
    ```

- Valid Response Body:
    ```json
    {
        "status": "SUCCESS",
        "success": true,
        "data": 
        {
            "id": 4,
            "employeeId": "012549",
            "password": "$2a$10$aMS5lyAGf.vyycBPX.f4MeIPj3y1Ugwxbuw/UFxqe0U4RJR63Pbge",
            "active": true,
            "roles": "ORG_SETUP"
        },
        "message": "user credential updated Successfully",
        "errors": null,
        "fieldsErrors": null
    }
    ```



---

## 2. Create a User
- doc name : **User**
- endpoint : `/POST /users`
- Valid Request Body:
    ```json
    {
        "emailAddress" : "test7@gmail.com",
        "designation" : "test",
        "employeeId" : "123",
        "businessUnit": "test",
        "department" : "test",
        "roles" : "EMPLOYEE"
    }
    ```

- Valid Response Body:
    ```json
    {
        "status": "SUCCESS",
        "success": true,
        "data": {
            "id": 6,
            "emailAddress": "test7@gmail.com",
            "designation": "test",
            "employeeId": "123",
            "businessUnit": "test",
            "department": "test",
            "roles": "EMPLOYEE",
            "userCredential": {
                "id": 6,
                "employeeId": "123",
                "password": null,
                "active": true,
                "roles": "EMPLOYEE"
            }
        },
        "message": "user created successfully",
        "errors": null,
        "fieldsErrors": null
    }
    ```


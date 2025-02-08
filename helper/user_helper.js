function createRandomUser(){
        const userdata = {
            email: `test-${Math.floor(Math.random() * 9999)}@gmail.com`,
            name: "Kate Lennert",
            gender: "female",
            status: "active",
          };
          const url = `users?access-token=${TOKEN}`;
          const userRes = request.post(url).send(userdata);
          userId = userRes.body.id;
          console.log(userId);
}
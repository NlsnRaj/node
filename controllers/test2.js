      mongodb.connect(
        url, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        },
        (err, client) => {
          if (err) throw err;
          client
            .db("testingdb")
            .collection("category")
            .insertMany(csvData, (err, res) => {
              if (err) throw err;
              console.log(`Inserted: ${res.insertedCount} rows`);
              client.close();
            });
        }
      );
    });
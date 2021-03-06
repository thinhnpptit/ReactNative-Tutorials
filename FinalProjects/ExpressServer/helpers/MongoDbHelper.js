'use strict';
// Khai báo thư viện MongoClient
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

// Chuỗi kết nối đến MongoDB
// const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/OnlineShopDb';
const CONNECTION_STRING = 'mongodb://aptech:Aptech2018@ds259001.mlab.com:59001/onlineshop';
const DATABASE_NAME = 'onlineshop';

class MongoDbHelper {
	// INSERT: Thêm mới (một)
	insertDocument(data, collectionName) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true })
				.then(client => {
					var dbo = client.db(DATABASE_NAME);
					var collection = dbo.collection(collectionName);
					collection
						.insertOne(data)
						.then(result => {
							resolve({ data: data, result: result });
						})
						.catch(err => {
							console.log(err);
							reject(err);
						})
						.finally(() => {
							client.close();
						});
				})
				.catch(err => {
					console.log(err);
					reject(err);
				});
		});
	}

	// ----------------------------------------------------------------------------
	// INSERT: Thêm mới (nhiều)
	insertDocuments(list, collectionName) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true })
				.then(client => {
					var dbo = client.db(DATABASE_NAME);
					var collection = dbo.collection(collectionName);
					collection
						.insertMany(list)
						.then(result => {
							resolve(result);
						})
						.catch(err => {
							reject(err);
						})
						.finally(() => {
							client.close();
						});
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	// ----------------------------------------------------------------------------
	// UPDATE: Sửa
	updateDocument(id, data, collectionName) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true })
				.then(client => {
					var dbo = client.db(DATABASE_NAME);
					var collection = dbo.collection(collectionName);
					var query = { _id: ObjectID(id) };
					collection
						.findOneAndUpdate(query, { $set: data })
						.then(result => {
							resolve(result);
						})
						.catch(err => {
							reject(err);
						})
						.finally(() => {
							client.close();
						});
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	// ----------------------------------------------------------------------------
	// UPDATE: Sửa (nhiều)
	updateDocuments(query, data, collectionName) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true })
				.then(client => {
					var dbo = client.db(DATABASE_NAME);
					var collection = dbo.collection(collectionName);
					collection
						.updateMany(query, { $set: data })
						.then(result => {
							resolve(result);
						})
						.catch(err => {
							reject(err);
						})
						.finally(() => {
							client.close();
						});
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	// ----------------------------------------------------------------------------
	// REMOVE: Xoá
	deleteDocument(id, collectionName) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true })
				.then(client => {
					var dbo = client.db(DATABASE_NAME);
					var collection = dbo.collection(collectionName);
					var query = { _id: ObjectID(id) };
					collection
						.deleteOne(query)
						.then(result => {
							resolve(result);
						})
						.catch(err => {
							reject(err);
						})
						.finally(() => {
							client.close();
						});
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	// ----------------------------------------------------------------------------
	// REMOVE: Xoá (nhiều)
	deleteDocuments(query, collectionName) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true })
				.then(client => {
					var dbo = client.db(DATABASE_NAME);
					var collection = dbo.collection(collectionName);
					collection
						.deleteMany(query)
						.then(result => {
							resolve(result);
						})
						.catch(err => {
							reject(err);
						})
						.finally(() => {
							client.close();
						});
				})
				.catch(err => {
					reject(err);
				});
		});
	}
	// ----------------------------------------------------------------------------
	// FIND: Tìm kiếm (id)
	async findDocument(id, collectionName, projection) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true })
				.then(client => {
					var dbo = client.db(DATABASE_NAME);
					var collection = dbo.collection(collectionName);
					var query = { _id: ObjectID(id) };
					collection
						.findOne(query)
						.then(result => {
							resolve(result);
						})
						.catch(err => {
							reject(err);
						})
						.finally(() => {
							client.close();
						});
				})
				.catch(err => {
					reject(err);
				});
		});
	}
	// ----------------------------------------------------------------------------
	// FIND: Tìm kiếm (nhiều)
	findDocuments(query, collectionName, projection) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true })
				.then(client => {
					var dbo = client.db(DATABASE_NAME);
					var collection = dbo.collection(collectionName);
					collection
						.find(query)
						.project(projection)
						.toArray()
						.then(result => {
							resolve(result);
						})
						.catch(err => {
							console.log(err);
							reject(err);
						})
						.finally(() => {
							client.close();
						});
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	getProducts(query, collectionName, page, size) {
		var skip = 0;
		if (page === 1) skip = 0;
		skip = size * (page - 1);

		return new Promise((resolve, reject) => {
			MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true })
				.then(client => {
					var dbo = client.db(DATABASE_NAME);
					var collection = dbo.collection(collectionName);
					collection
						.find(query)
						.skip(skip)
						.limit(size)
						.toArray()
						.then(result => {
							client.close();
							resolve(result);
						})
						.catch(err => {
							console.log(err);
							reject(err);
						});
				})
				.catch(err => {
					console.log(err);
					reject(err);
				});
		});
	}

	// FIND: Tìm kiếm (nhiều)
	// findDocuments(query, collectionName) {
	// 	return new Promise((resolve, reject) => {
	// 		MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true })
	// 			.then(client => {
	// 				var dbo = client.db(DATABASE_NAME);
	// 				var collection = dbo.collection(collectionName);
	// 				//var collection = dbo.collection('orders');
	// 				collection
	// 					.find(query)
	// 					// .aggregate([
	// 					// 	{
	// 					// 		$lookup: {
	// 					// 			from: 'products',
	// 					// 			localField: 'productId',
	// 					// 			foreignField: '_id',
	// 					// 			as: 'orderdetails'
	// 					// 		}
	// 					// 	}
	// 					// ])
	// 					//.skip(4)
	// 					//.limit(100)
	// 					//.project({ name: 1, price: 1, discount: 1 })
	// 					//.sort({ price: -1, name: 1 })
	// 					.toArray()
	// 					.then(result => {
	// 						client.close();
	// 						resolve(result);
	// 					})
	// 					.catch(err => {
	// 						reject(err);
	// 					});
	// 			})
	// 			.catch(err => {
	// 				reject(err);
	// 			});
	// 	});
	// };
	findProducts(query) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true })
				.then(client => {
					var dbo = client.db(DATABASE_NAME);
					var collection = dbo.collection('products');
					//var collection = dbo.collection('orders');
					collection
						// .find(query)
						.aggregate([
							{
								$lookup: {
									from: 'categories',
									localField: 'categoryId',
									foreignField: 'subCategories._id',
									as: 'category',
								},
							},
							{
								$match: query,
							},
						])
						.find(query)
						//.skip(4)
						//.limit(100)
						//.project({ name: 1, price: 1, discount: 1 })
						//.sort({ price: -1, name: 1 })
						.toArray()
						.then(result => {
							client.close();
							resolve(result);
						})
						.catch(err => {
							reject(err);
						});
				})
				.catch(err => {
					reject(err);
				});
		});
	}
}

module.exports = new MongoDbHelper();

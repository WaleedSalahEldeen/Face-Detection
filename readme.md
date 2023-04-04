# TECHNOLOGIES USED

Combine node.js with the libraries like:

- Express: ( Handling api routes,server,middlewares and more ).
- FaceApi with Tensorflow: ( process & recognize Faces from images ).
- Multer: ( acts as a middleware to receive uploaded image as a buffer will be used later ).
- Compression: ( to compress the response in json back to user ).

# API ENDPOINTS

So We Have two endpoints

---

### Get One Face

```http
  POST /api/v1/face
```

- and that simply just focus on one face so if the image have 3 different faces
- we will just get one of them

  | Parameter   | Type      | Description                    |
  | :---------- | :-------- | :----------------------------- |
  | `photo`     | `photo`   | **Required**                   |
  | `useTiny`   | `Boolean` | **optional**. (default: False) |
  | `inputSize` | `Number`  | **optional**. (default: 608)   |

### Get an Array of multiple faces

```http
  POST /api/v1/faces
```

- and that one will got all faces in a single photo
- each face will be then parsed into element of json array

  | Parameter       | Type      | Description                   |
  | :-------------- | :-------- | :---------------------------- |
  | `photo`         | `photo`   | **Required**                  |
  | `useTiny`       | `Boolean` | **optional**. (default: False |
  | `inputSize`     | `Number`  | **optional**. (default: 608)  |
  | `minConfidence` | `Number`  | **optional**. (default: 10)   |

## NOTES

face-api has two algorithm for detecting faces:-

- `SsdMobilenetv1` => Our Api use it by default.
- `TinyFaceDetector` => You have to set `useTiny = True` in order to use it.

if using the default option which is again `SsdMobilenetv1`, you can:-

- Set `minConfidence` in the request body to only output faces with detectionScore more than this number.
- use ?limit=num to limit the number of faces returned `(default = 10)`
  a quick example for using limit to return only 3 faces from photo

```http
  POST /api/v1/faces/?limit=3
```

if using `TinyFaceDetector`, you can:-

- Set `minConfidence` in the request body to only output faces with detectionScore more than this number.
- set `inputSize` which basically means the size of faces in the image the more, the better but also the slower.
  note: inputSize should only be number divisible by 32, and don't set it higher than 1600.

## Some Useful Resources

[Face-Api](https://github.com/vladmandic/face-api)

## Support

For support, email waleed9salah@gmail.com.

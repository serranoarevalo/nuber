import aws from "aws-sdk";
import { Resolvers } from "../../../types/resolvers";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import { SignS3URLResponse } from "../../../types/graph";

const BUCKET_NAME = "nuber";

interface IArgs {
  fileName: string;
  fileType: string;
}

const resolvers: Resolvers = {
  Mutation: {
    signS3URL: makeMiddleware(
      authMiddleware,
      async (_, args: IArgs, { req }): Promise<SignS3URLResponse> => {
        const s3 = new aws.S3({
          signatureVersion: "v4",
          region: "ap-northeast-1"
        });

        const s3Params = {
          Bucket: BUCKET_NAME,
          Key: args.fileName,
          Expires: 60,
          ContentType: args.fileType,
          ACL: "public-read"
        };

        try {
          const signedUrl = await s3.getSignedUrl("putObject", s3Params);
          const fileUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${
            args.fileName
          }`;
          return {
            ok: true,
            error: null,
            signedUrl,
            fileUrl
          };
        } catch (error) {
          return {
            ok: false,
            error,
            signedUrl: null,
            fileUrl: null
          };
        }
      }
    )
  }
};

export default resolvers;

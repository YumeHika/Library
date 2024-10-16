from minio import Minio
from minio.error import S3Error
from datetime import timedelta

class MinioClientAPI:
    def __init__(self, endpoint, access_key, secret_key, secure=False):
        self.client = Minio(endpoint, access_key=access_key, secret_key=secret_key, secure=secure)

    def create_bucket(self, bucket_name):
        if not self.client.bucket_exists(bucket_name):
            self.client.make_bucket(bucket_name)
            print(f"Bucket '{bucket_name}' created.")
        else:
            print(f"Bucket '{bucket_name}' already exists.")

    def upload_file(self, bucket_name, object_name, file_path):
        try:
            self.client.fput_object(bucket_name, object_name, file_path)
            print(f"'{file_path}' uploaded to '{bucket_name}/{object_name}'.")
        except S3Error as e:
            print(f"File upload failed: {e}")

    # expires in 5 minutes
    def generate_presigned_url(self, bucket_name, object_name, expires=300000):
        try:
            expiration_time = timedelta(seconds=expires)
            url = self.client.presigned_get_object(bucket_name, object_name, expires=expiration_time)
            return url
        except S3Error as e:
            print(f"Error generating presigned URL: {e}")
            return None



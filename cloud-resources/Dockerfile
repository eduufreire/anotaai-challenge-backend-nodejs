FROM hashicorp/terraform

WORKDIR /app

COPY main.tf .

RUN terraform init

CMD [ "apply", "--auto-approve" ]

from pydantic import BaseModel, Field

class File(BaseModel):
    path: str = Field(description="The file path where the file will be created, eg. /src/components/Header.js")
    purpose: str = Field(description="The purpose of the file, eg. 'main application logic, 'data processing module'")

class Plan(BaseModel):
    name: str = Field(description="The name of the project")
    description: str = Field(description="A single line description of the project")
    techstack: list[str] = Field(description="A list of technologies to be used in the project, eg. ['React', 'Node.js']")
    features: list[str] = Field(description="A list of features to be implemented in the project, eg. ['User authentication', 'Real-time chat']")
    files: list[File] = Field(description="A list of files to be created for the project, each with a path and purpose")


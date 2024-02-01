# UHome

### Setting Development Environment
For this project, we decided to use the Django framework for our backend. Here are the steps to setup your dev environment. Note that you should change your directory to backend folder, i.e. your working directory should look like `../web-app/backend`.
```sh
# Install virtualenv to isolate installed packages.
pip install virtualenv
# Create a virtual Python environment. Replace python3 with the right command (py is generally used in Windows)
python3 -m venv uhomeenv
```
Next, we'll activate our environment. It is different on each platform. Run the correct command for your platform.
```sh
# Mac/Unix
source uhomeenv/bin/activate
# Windows CMD
uhomeenv/Scripts/activate.bat
# Windows PowerShell
uhomeenv/Scripts/activate.bat
```
Next, we'll install requirements such as Django.
```sh
pip install -r requirements.txt
```
That's all.

### Running Web App
Before running the following command, note that you should change your directory to backend/src folder, i.e. your working directory should look like `../web-app/backend/src`.
```sh
# Replace python3 with the right command (py is generally used in Windows)
python3 manage.py runserver
```
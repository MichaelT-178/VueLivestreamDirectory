import os
import subprocess
import sys
from termcolor import colored as c

DOMAIN_LINK = 'www.coreyheuvelsearch.com'

process = subprocess.run('git status', shell=True, capture_output=True, text=True)

output = process.stdout

# branch = repr(output).split("\\n")[0].replace("'On branch ", "").strip()

branch_line = output.splitlines()[0]
branch = branch_line.replace("On branch ", "").strip()

print('On branch ', end="")

if branch == 'main':
	print(c(branch, 'green'))
else:
	print(c(branch, 'red'))
	print('Move changes to the main branch, then switch to the main branch.')
	print('git stash')
	print('git checkout main')
	print('git pull origin main')
	print(f'git merge {branch}')
	print('git stash apply')
	print('git push origin main')
	exit(0)

if len(sys.argv) > 1:
    commit_msg = sys.argv[1]
else:
    commit_msg = input("Enter your commit message: ")

os.system('git add .')
os.system(f'git commit -m "{commit_msg}"')
os.system('git push origin main')
os.system('npm run build')
os.system('cp dist/index.html dist/404.html')

os.system(f"echo '{DOMAIN_LINK}' > dist/CNAME")

os.system('git add dist -f')
os.system(f'git commit -m "{commit_msg}"')
os.system('git subtree split --prefix dist -b gh-pages-temp')
os.system('git push origin gh-pages-temp:gh-pages --force')
os.system('git branch -D gh-pages-temp')


all:
	npx esbuild todolist_renew/front/App.tsx --bundle --outfile=todolist_renew/static/dist/app.js --minify --loader:.tsx=tsx

debug:
	npx esbuild todolist_renew/front/App.tsx --bundle --outfile=todolist_renew/static/dist/app.js --loader:.tsx=tsx

run: all
	python manage.py runserver
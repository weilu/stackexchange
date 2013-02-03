
build: components index.js stackexchange.css templates
	@component build

templates: templates/index.js templates/user_show.js templates/user_questions.js

templates/index.js: templates/index.html
	component convert $<

templates/user_show.js: templates/user_show.html
	component convert $<

templates/user_questions.js: templates/user_questions.html
	component convert $<

components: component.json
	@component install --dev

clean:
	rm -fr build components templates/*.js

.PHONY: clean templates

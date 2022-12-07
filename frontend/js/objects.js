class ClasePreu {
	// Enum-like class
	static gratis = new ClasePreu(0, 'gratis', 0, 0);
	static barat = new ClasePreu(1, 'barat', 0.01, 7.99);
	static mitja = new ClasePreu(2, 'mitjà', 8, 24.99);
	static car = new ClasePreu(3, 'car', 25, 1000);

	constructor(id, type, from, to) {
		this.id = id;
		this.type = type;
		this.range = { 'from': from, 'to': to };
	}

	toString() {
		return `${this.type}`;
	}

	get id() {
		return this._id;
	}

	set id(id) {
		this._id = id;
	}

	get type() {
		return this._type;
	}

	set type(type) {
		this._type = type
	}

	get range() {
		return this._range;
	}

	set range({ from, to }) {
		this._range = { "from": from, "to": to };
	}
}

class Genere {
	constructor(genere) {
		this.genere = genere;
	}

	toString() {
		return `${this.genere}`;
	}

	get genere() {
		return this._genere;
	}

	set genere(genere) {
		this._genere = genere;
	}
}

class Game {
	constructor(id, nom, preu, clase_preu, genere, dataLlan) {
		this.id = id;
		this.nom = nom;
		this.preu = preu;
		this.clase_preu = preu;
		this.genere = genere;
		this.dataLlan = dataLlan;
	}

	set id(id) {
		this._id = id;
	}

	get id() {
		return this._id;
	}

	set nom(nom) {
		this._nom = nom;
	}

	get nom() {
		return this._nom;
	}

	set preu(preu) {
		this._preu = preu;
	}

	get preu() {
		return this._preu;
	}

	set clase_preu(preu) {
		const objk = Object.keys(ClasePreu);
		for (const gt in objk) {
			if (ClasePreu[objk[gt]].range.to >= preu && ClasePreu[objk[gt]].range.from <= preu) {
				this._clase_preu = ClasePreu[objk[gt]];
			}
		}
	}

	get clase_preu() {
		return this._clase_preu;
	}

	set genere(genere) {
		this._genere = new Genere(genere)
	}

	get genere() {
		return this._genere;
	}

	set dataLlan(data) {
		this._dataLlan = new Date(data);
	}

	get dataLlan() {
		return this._dataLlan.toISOString().slice(0, 10);
	}

	toString() {
		return `${this.nom} va ser llançat el ${this.dataLlan}. És un joc ${this.genere} i té un preu ${this.clase_preu}, de ${this.preu}`;
	}
}

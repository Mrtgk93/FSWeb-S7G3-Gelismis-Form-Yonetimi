describe("Kayıt Formu ", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("isim inputunu al ve isim yaz", () => {
    const newIsim = "Mert";
    cy.get("[data-cy=dataisim]").type(`${newIsim}{enter}`);
    cy.get("[data-cy=dataisim]").should("have.value", `${newIsim}`);
  });
  it("email inputunu al ve bir email gir", () => {
    const newMail = "mrtgk93@mrt.com";
    cy.get("[data-cy=dataemail]").type(`${newMail}{enter}`);
  });
  it("sifre inputunu al ve bir sifre gir", () => {
    const newSifre = "123456";
    cy.get("[data-cy=datasifre]").type(`${newSifre}{enter}`);
  });
  it("kullanım kosulları checkbox'ı işaretlendi mi?", () => {
    cy.get("[data-cy=datacheckbox]").check();
  });
  it("test verileri gönderiliyor mu ?", () => {
    cy.get("[data-cy=datasubmit]").click();
  });
});

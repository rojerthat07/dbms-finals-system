<template>
  <div class="information-section">
    <img
      v-bind:src="admissionImage"
      alt=""
      class="information-section__image"
    />
    <div class="information-section__description">
      <h1 class="information-section__description--heading">
        DHVSU Student Online Account Registration
      </h1>
      <p class="information-section__description--info">
        The Office of Admissions of Don Honorio Ventura Technological State
        University provides for the selection of prospective students regardless
        of age, race, gender, religion, nationality and economic status. It
        defines the policies and practices of admissions, which are reflective
        of the objectives of the institution.
      </p>
      <p class="information-section__description--info">
        Qualified applicants who will be entitled to profit from the educational
        programs of the College are admitted to the University. The following
        factors are considered in the evaluation of application for admission:
        past scholastic records, scholastic aptitude, character, recommendations
        and applicant's acceptance of the policies, rules and regulations of the
        College and of the University.
      </p>
      <h1 class="information-section__description--heading">
        Privacy Policy Agreement
      </h1>
      <p class="information-section__description--info">
        The Don Honorio Ventura State University is collecting personal
        information for the purpose of determining your eligibility for
        admission, facilitating Don Honorio Ventura State University Admission
        Test(DHVSUAT), releasing DHVSUAT results, consideration for scholarship
        and enrollment.
      </p>

      <p class="information-section__description--info">
        When registered, all the information collected will become part of your
        permanent record that will be kept for good by the University. The
        results of your DHVSUAT are valid for one year of school. Your personal
        information will be kept by the University for one academic year for
        those who applied but did not proceed with the registration and for
        those who did not qualify. After that, all documents will be disposed.
      </p>

      <p class="information-section__description--info">
        We Ensure that your informations will kept private and only used for
        this admission for following RA 10173, or the Data Privacy Act of 2012.
      </p>
      <div class="college-form__button" style="margin:0;">
        <router-link to="/admission">
          <button class="college-form__button--button">
            BACK
          </button></router-link
        >
        <router-link to="/college-information">
          <button class="college-form__button--button">
            I Agree
          </button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import admissionImage from "../../assets/ADMISSIONS.png";

export default {
  name: "AgreementCollege",
  data() {
    return {
      admissionImage,
    };
  },
};
</script>

<style></style>

<template lang="html">
<div>
<app-nav></app-nav>

<div class="container">
    <form id="contact-form" method="post" action="" role="form">
        <div class="messages"></div>
        <div class="controls">
            <div class="row">
                <div class="col-sm-4">
                    <div class="form-group">
                        <label for="form_name">Ime *</label>
                        <input id="form_name" type="text" name="surname" class="form-control" placeholder="Molimo Vas upišite Vaše ime *" required="required" data-error="name is required.">
                        <div class="help-block with-errors"></div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="form-group">
                        <label for="form_email">Email *</label>
                        <input id="form_email" type="email" name="email" class="form-control" placeholder="Molimo Vas unesite Vaš email *" required="required" data-error="Valid email is required.">
                        <div class="help-block with-errors"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>

        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="form_message">Vaša poruka *</label>
                    <textarea id="form_message" name="message" class="form-control" placeholder="Vaša poruka *" rows="4" required="required" data-error="send a message."></textarea>
                    <div class="help-block with-errors"></div>
                </div>
            </div>
            <div class="col-md-12">
                <input type="submit" class="btn btn-warning btn-send" value="Pošalji poruku">
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p class="text-muted"><strong>*</strong> Ova polja su obavezna.</p>
            </div>
        </div>
    </form>
</div>
<div class="odvoji"></div>
<app-footer></app-footer>

</div> <!-- root div-->

</template>
<style lang="css" scoped>

#contact-form {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 2rem;
    font-weight: 400;
    line-height: 1.5;
    color: black;
    text-align: left;
    background-color: transparent;
}
.odvoji {
  height: 200px;
}



</style>

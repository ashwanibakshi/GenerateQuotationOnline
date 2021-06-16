
        $(document).ready(function(){

            
            
                  $('body form').show();
                  $('.delete-row').show();
                  $('.print-page').show();
                  $('thead .remove').show(); 
                  $('.curd').show();
                     
            //-------------- datee -------------// 
              
                var date   = new Date();
                var cdate  = date.getDate();
                var cmonth = date.getMonth()+1;
                var cyear  = date.getFullYear();
                
                var datee = 'Date :'+cdate+'-'+cmonth+'-'+cyear;
                $('.datee').text(datee);

            //------------ datee ends ---------//

            //------------- add rows ---------//
            $(".add-row").click(function(){
                var description = $("#description").val();
                var rates       = $("#rates").val();
                var qty         = $("#qty").val();
                var amt         = $("#amt").val();

                var markup = "<tr><td><input type='checkbox' name='description' class='remove' ></td><td>" + description + "</td><td>" +rates+ "</td><td>" +qty+ "</td><td>" +amt+ "</td></tr>";
                $("table tbody").append(markup);
                var description = $("#description").val('');
                var rates       = $("#rates").val('');
                var qty         = $("#qty").val('');
                var amt         = $("#amt").val('');
            });
            //------------- add rows end ---------//

            //------------- delete rows ---------//
            // Find and remove selected table rows
            $(".delete-row").click(function(){
                $("table tbody").find('input[name="description"]').each(function(){
                    if($(this).is(":checked")){
                        $(this).parents("tr").remove();
                    }
                });
            });
          //------------- delete rows ends ---------//

          // -------------- print page-----------//
            $(".print-page").click(function(){
                  $('body form').hide();
                  $('.delete-row').hide();
                  $('.print-page').hide();
                  $('thead .remove').hide();
                  $('.curd').hide();
                // $('tr:nth-child(0)').hide();
                var bankname= $('#bankname').val();
                 
                $('.bankdetails').append('BANK NAME :  '+$('#bankname').val()+'<br>'+'A/C:  '+$('#accno').val()+'<br>'+'IFSC :  '+$('#ifsc').val());
                $('.cname').text($('#cname').val());
                $('.caddress').text($('#caddress').val()); 
                $('.cphno').text($('#cphno').val());

                var date   = new Date();
                var cmonth = (date.getMonth())+1;
                var cdate =  date.getFullYear()+'-'+ cmonth +'-'+date.getDate();

                var customer =[];
                customer.push({"cname":$('#cname').val(),
                "caddress":$('#caddress').val(),
                "cphno":$('#cphno').val(),
                "bankname":$('#bankname').val(),
                "ifsc":$('#ifsc').val(),
                "accountno":$('#accno').val(),
                "total":$(".totall").text().replace(/,/g, ''),
                "date":cdate
                  });  
            
                var table = $("table tbody");
                var qdata = [];
                table.find('tr').each(function (i) {
                    var $tds = $(this).find('td'),
                        item = $tds.eq(0).text(),
                        rate = $tds.eq(1).text().replace(/,/g, ''),
                        qty = $tds.eq(2).text();  
                        amt = $tds.eq(3).text().replace(/,/g,""); 

                if(item!=='' && item!==undefined && item!==null){
               qdata.push({'item':item,'rate':rate,'qty':qty,'amt':amt});
                }
            });  //each loop ends
            
            $.ajax({
                 method:'post',
                 url:'http://localhost:3000/save/customer/quotation',
                 data:{'customer':customer,'data':qdata},
                 dataType:'JSON',
                 success:function(data){
                         if(data.msg=='success'){
                           
                            setTimeout(()=>{
                                window.location.href="http://127.0.0.1:5500/home.html"
                            },2000)
                            window.print();
                            $('table tbody tr').remove();
                         }
                         else{
                             console.log(data);
                         }
                 },
                  error:function(error){
                   console.log(error);
                 }
              });   
            });
   //---------------- print page ends ---------------//
   $('.printduplicatee').show();
   $('.savequot').hide();

  

        });
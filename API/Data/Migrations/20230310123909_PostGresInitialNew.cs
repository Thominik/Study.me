using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class PostGresInitialNew : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "93caea7e-d4d5-451e-9b90-9a174f02ab5c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ffee0b0a-2547-4bf3-831e-7fb03850d424");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6ceaf19e-b3d6-4344-93f8-ad38f29c1cbe", "c033469d-ddd0-4839-a998-f778003c565a", "Admin", "ADMIN" },
                    { "e5fb941e-9a67-4aad-b9fd-a6989dc2e846", "9530ac0a-30d5-4d7e-b4b4-0dd78f147887", "Member", "MEMBER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6ceaf19e-b3d6-4344-93f8-ad38f29c1cbe");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e5fb941e-9a67-4aad-b9fd-a6989dc2e846");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "93caea7e-d4d5-451e-9b90-9a174f02ab5c", "500833e3-3307-4f8b-ab5a-04c8d02282cb", "Member", "MEMBER" },
                    { "ffee0b0a-2547-4bf3-831e-7fb03850d424", "ca264395-2459-4b4b-badb-8bb64a86f62f", "Admin", "ADMIN" }
                });
        }
    }
}
